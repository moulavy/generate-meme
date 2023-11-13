import Model from './model.js';
import View from './view.js';
import Controller from './controller.js';

const model = new Model();
const view = new View('.memeCanvas');
const controller = new Controller(model, view);

window.controller = controller;
window.model = model;
window.view = view;
