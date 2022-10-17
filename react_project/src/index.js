import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import './assets/index.css';
import Router from './router/router.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import "./i18n";


ReactDOM.render(

    <Suspense fallback={<div>Loading...</div>}>
    <Router  />
    </Suspense>


,  document.getElementById('root')
);
