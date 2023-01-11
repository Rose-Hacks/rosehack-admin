import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

export default async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    void deleteDoc(doc(db, "users", req.body.email));
    void deleteDoc(doc(db, "teams", req.body.team));
  } catch {
    console.log("Error while deleting user");
  }
  res.status(200).json({});
}
