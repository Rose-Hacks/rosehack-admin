import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default async function updateTeamField(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await updateDoc(doc(db, "teams", req.body.id), {
    [req.body.field]: req.body.status,
  });
  res.status(200).json({});
}
