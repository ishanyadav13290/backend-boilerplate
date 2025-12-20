import { Router } from "express";
import UserController from "../controllers/user.controller";

const router = Router();

/**
 * @openapi
 * /api/users/getUser:
 *   get:
 *     tags: [Users]
 *     summary: Get current user using token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The current user
 *       401:
 *         description: Unauthorized
 */
router.get("/getUser", UserController.getUserDataWithToken);

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a user by id
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */
router.delete("/:id", UserController.deleteUser);

export default router;
