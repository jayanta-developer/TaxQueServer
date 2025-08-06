import { Request, Response } from "express";
const Team = require("../Module/team");


export const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, role, summary, email, media, imgUrl } = req.body;

    if (
      !name ||
      !email
    ) {
      return res.status(400).json({ message: "User Name and email required !" });
    }

    const newTeam = new Team({
      name,
      role,
      summary,
      email,
      media,
      imgUrl
    });

    await newTeam.save();

    return res.status(201).json({ message: "Team created successfully", data: newTeam });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const Teams = await Team.find();
    res.status(200).json(Teams);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}


export const updateTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ message: "Team ID is required." });
    }

    // Optional: Validate if updates is empty
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No update fields provided." });
    }

    // Use dot notation if media updates are nested
    const updateData: any = {};

    // Flatten media if present
    if (updates.media) {
      for (const key in updates.media) {
        if (Object.prototype.hasOwnProperty.call(updates.media, key)) {
          updateData[`media.${key}`] = updates.media[key];
        }
      }
      delete updates.media;
    }

    // Add top-level fields (like name, role, summary, etc.)
    Object.assign(updateData, updates);

    const updatedTeam = await Team.findByIdAndUpdate(id, { $set: updateData }, { new: true });

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found." });
    }

    return res.status(200).json({ message: "Team updated successfully", data: updatedTeam });
  } catch (error) {
    console.error("Error updating team:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};



// Delete Team
export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Team error", error });
  }
};



export const fix = async (req: Request, res: Response) => {
  try {
    const result = await Team.updateMany(
      { "media.0.facebook": { $exists: true } },
      [
        {
          $set: {
            media: {
              $arrayElemAt: ["$media", 0],
            },
          },
        },
      ]
    );
    res.status(200).json({ message: "Media field fixed", result });
  } catch (error) {
    res.status(500).json({ message: "Error fixing media", error });
  }
};