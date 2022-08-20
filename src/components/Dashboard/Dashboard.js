import React from 'react';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import "primeflex/primeflex.css";

export default function Dashboard() {
  return(


<div className="surface-0 text-center">
    <div className="mb-3 font-bold text-3xl">
        <span className="text-900">Bienvenidos, </span>
        <span className="text-blue-600">APLICACION COVID PRUEBA TECNICA</span>
    </div>
    <div className="text-700 text-sm mb-6">Opciones disponibles:</div>
    <div className="grid">
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-desktop text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 mb-3 font-medium">Menu Paises</div>
            <span className="text-700 text-sm line-height-3">Ver totales globales, ver totales por país, se puede entrar a cada país y ver los últimos 30 registros, buscar un país es especifico.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-lock text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 mb-3 font-medium">Menu Mi Perfil</div>
            <span className="text-700 text-sm line-height-3">En construcción.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-check-circle text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 mb-3 font-medium">Menu Registrar Datos</div>
            <span className="text-700 text-sm line-height-3">Llenar formulario para registrar sintomas.</span>
        </div>
        <div className="col-12 md:col-4 mb-4 px-5">
            <span className="p-3 shadow-2 mb-3 inline-block" style={{ borderRadius: '10px' }}>
                <i className="pi pi-globe text-4xl text-blue-500"></i>
            </span>
            <div className="text-900 mb-3 font-medium">Menu Autenticar</div>
            <span className="text-700 text-sm line-height-3">se muestra login para administradores del sistema.</span>
        </div>
    </div>
</div>
    

    );
}