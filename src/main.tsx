import React from 'react';import {createRoot} from 'react-dom/client';import {pages} from './pages';import './styles.css';
const path=location.pathname.replace(/\/$/,'')||'/';
const titles:Record<string,string>={'/menu':'Full Menu','/locations':'Locations & Contact','/sources':'Information Sources'};
document.title=titles[path]?`${titles[path]} | Honey Mustard Lebanon`:'Honey Mustard Lebanon | Salads & Grills';
const Page=pages[path]||pages['/'];createRoot(document.getElementById('root')!).render(<Page/>);
