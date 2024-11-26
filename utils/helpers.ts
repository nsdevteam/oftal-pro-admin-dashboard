import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db,storage } from "../api/init";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
  } from "firebase/storage";    
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const ordersDatabase = collection(db, "orders");
const clientsDatabase = collection(db, "orders");
const pricesDatabase = collection(db, "orders");

async function addFile(file: File,folder:string,misc?: {prefix:string;suffix:string;}): Promise<string> {
    if (!file) throw new Error("No file provided");
  
    // Reference to storage location
    const storageRef = ref(storage, `${folder}/${misc?.prefix||''}${file.name}${misc?.suffix||''}`);               
  
    // Upload file
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            // Get the file's download URL after upload is complete
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            console.error("Error getting download URL:", error);
            reject(error);
          }
        }
      );
    });
}

export interface DocumentData {
  id: string; // Document ID
  [key: string]: any; // Other fields
}

interface QueryCondition {
  field: string;
  operator: any,
  value: any;
}

const getAllData = (collectionName: string, conditions?: QueryCondition[]) => {
  return async (): Promise<any[]> => {
    try {
      const collRef = collection(db, collectionName); // Get reference to the Firestore collection

      // Start building the query with the provided conditions
      let firestoreQuery = query(collRef);

      // Add conditions dynamically
      conditions?.forEach((condition) => {
        firestoreQuery = query(firestoreQuery, where(condition.field, condition.operator, condition.value));
      });    

      // Get documents
      const querySnapshot = await getDocs(firestoreQuery);

      // Map through the results and return them
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw new Error("Failed to fetch data.");
    }
  };
};
   
async function deleteFile(filePath: string): Promise<void> {
  try {
    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(fileRef);
    console.log(`File at path '${filePath}' deleted successfully.`);
  } catch (error: any) {
    if (error.code === "storage/object-not-found") {
      console.error("File not found:", filePath);
    } else {
      console.error("Error deleting file:", error.message);
    }
    throw new Error("Failed to delete file.");
  }
}
async function getDocument(collectionName: string, documentId: string): Promise<DocumentData | null> {
  try {   
    // Create a reference to the document
    const documentRef = doc(db, collectionName, documentId);

    // Fetch the document
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      // Return the document data with its ID
      return { id: documentSnapshot.id, ...documentSnapshot.data() };
    } else {
      console.log(`Document with ID '${documentId}' not found in collection '${collectionName}'.`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch document.");
  }
}  
async function getCollectionSize(collectionName: string): Promise<number> {
  try {
    // Get a reference to the collection
    const collectionRef = collection(db, collectionName);

    // Fetch all documents in the collection
    const snapshot = await getDocs(collectionRef);

    // Return the size of the collection
    return snapshot.size; // The size property gives the number of documents
  } catch (error) {
    console.error("Error fetching collection size:", error);
    throw new Error("Failed to fetch collection size.");
  }
}

async function updateDocument(collectionName: string, documentId: string, data: any): Promise<void> {
  try {
    // Get a reference to the document
    const docRef = doc(db, collectionName, documentId);

    // Update the document with the provided data
    await updateDoc(docRef, data);

    console.log("Document updated successfully");
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document.");
  }
}

async function logout(): Promise<void> {
  try {
    const auth = getAuth(); // Get the Firebase auth instance

    // Sign out the user
    await signOut(auth);   

    console.log("User logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error("Failed to log out.");
  }
}

function getCurrentUser() {
  const auth = getAuth(); // Get the Firebase Auth instance
  const user = auth.currentUser; // Get the currently logged-in user

  if (user) {
    console.log("Current User: ", user);
    return user;
  } else {
    console.log("No user is logged in.");
    return null; // No user is logged in
  }
}


// Function to handle login with email and password
async function loginWithEmailAndPassword(email: string, password: string): Promise<any> {
  const auth = getAuth(); // Get Firebase Authentication instance

  try {
    // Attempt to sign in the user with email and password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user; // Get the user from the response
    console.log("Logged in as:", user.email); // Log user email or other user data
    return user;
         
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Failed to login.");
  }
}
async function downloadFirebaseFile(storageUrl: string, filename?: string): Promise<void> {
  try {
    // Fetch the file from the storage URL
    const response = await fetch(storageUrl);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a temporary anchor element
    const anchor = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);

    // Set the download attributes
    anchor.href = objectUrl;
    anchor.download = filename || 'downloaded-file';

    // Append the anchor, trigger the click, and clean up
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Release the object URL
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

export {
    clientsDatabase,
    ordersDatabase,
    pricesDatabase,
    getAllData,   
    getDocument,
    updateDocument,    
    getCollectionSize,
    addFile,
    deleteFile,
    getCurrentUser,
    logout,
    loginWithEmailAndPassword,
    downloadFirebaseFile           
};       