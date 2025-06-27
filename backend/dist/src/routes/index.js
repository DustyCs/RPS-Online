"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const game_1 = require("./game");
const router = (0, express_1.Router)();
router.use('/game', game_1.GameRouter);
exports.MainRouter = router;
