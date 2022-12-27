import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";

export default async function getAllUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result: Object[] = [];
  try {
    const snapshot = await getDocs(collection(db, "users"));
    snapshot.forEach((doc) => {
      result.push(doc.data());
    });
    res.status(200).json(result);
    res.end();
  } catch {
    res.status(500).json([]);
    res.end();
  }
}
