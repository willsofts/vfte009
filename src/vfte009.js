import "jquery";
import "jquery-ui";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery-ui-dist/jquery-ui.css";
import "bootstrap";
import "bootbox";
import "./assets/jquery/js/jquery.maskedinput.js";
import "./assets/css/font-awesome.css";
import "./assets/css/component.css";
import "./assets/css/base_style.css";
import "./assets/css/program_style.css";
import "./assets/css/user_style.css";
import program_message from './assets/json/program_message.json';
import default_labels from './assets/json/default_label.json';
import program_labels from './assets/json/program_label.json';
import { appInit } from "@willsofts/will-app";
appInit({program_message,default_labels,program_labels});
import { createApp, version } from 'vue';
import AppVfte009 from './AppVfte009.vue';
console.info("Vue version",version);
createApp(AppVfte009).mount('#app');
