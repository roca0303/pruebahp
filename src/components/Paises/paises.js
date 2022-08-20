import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import '../../index.css';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PaisesService } from './paisesService';                // COMPONENTE CON LAS CONEXIONES Y PETICIONES A LA API
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import useToken from '../App/useToken';
import { Card } from 'primereact/card';
import { Splitter, SplitterPanel } from 'primereact/splitter';

function App() {
    return (
        <div>
            <DataTableCrudPaises />
        </div>
    );
}

const DataTableCrudPaises = () => {

    let emptyProduct = {

    };

    const [products, setProducts] = useState(null);
    const [paisesInfo, setPaisesInfo] = useState(null);
    const [paisNombre, setPaisNombre] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [infoGlobals, setInfoGlobals] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);     // se usa para los datos de la api, 
    const [selectedProducts1, setSelectedProducts1] = useState(null);   // se usa para los datos de la dt 2 - informacion de los últimos 30 registros del país seleccionado
    const [globalFilter, setGlobalFilter] = useState(null);
    const [globalFilter1, setGlobalFilter1] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const paisesService = new PaisesService();
    const { token } = useToken();

    // cada vez que se refresque o se modifique el dom vuelvo a preguntar por informacion.
    useEffect(() => {
        paisesService.getPaisesList(token).then(data => {
            if (data == "Error"){
                //setPermisoPagina(null);
                setProducts(null);
            }
            else{
                //setPermisoPagina(true);
                setProducts(data['Countries']);
                setInfoGlobals(data['Global']);
            }
        });
    }, []);

    const openInfoPais = (e) => {
        // se pasa el SLUG del pais para la petición a la api de la información del país.
        setProductDialog(true);         // bandera para indicar si se muestra el modal con la segunda dt
        // se hace el llamado al metodo que trae la información de cada país
        paisesService.getPaisResgistros(e.Slug).then(data => {
            if (data == "Error"){
                //setPermisoPagina(null);
                setPaisesInfo(null);
            }
            else{
                var infoPaises = data.slice(data.length-360);
                setPaisNombre(infoPaises[0]["Country"]);
                setPaisesInfo(infoPaises);
            }
        });
                
    }

    // ocultar el modal con la informacion del país
    const hideDialog = () => {
        setProductDialog(false);
    }

    // renderizar la información de los globales
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Card title="Casos Globales"   style={{ width: '25rem', marginBottom: '2em' }}>
                    <p className="m-0" style={{lineHeight: '1.5'}}> Confirmados: {infoGlobals.TotalConfirmed} </p>
                    <p className="m-0" style={{lineHeight: '1.5'}}> Fallecidos: {infoGlobals.TotalDeaths} </p>
                    <p className="m-0" style={{lineHeight: '1.5'}}> Recuperados: {infoGlobals.TotalRecovered} </p>
                </Card>
            </React.Fragment>
        )
    }

    // encabezado del dt, dentro del encabezado ubico el inputtext para las busquedas
    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Paises</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    // encabezado del dt usado para la informacion por país, se deja decladado por si se va a usar mas adelante
    const header1 = (
        <React.Fragment>
        </React.Fragment>
    );
    
    // renderizar las opciones de cada fila del data table
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button id={rowData.id} label="Info Pais" icon="pi-question-circle" className="p-button-rounded p-button-info" 
                onClick={ () => openInfoPais(rowData) } />
            </React.Fragment>
        );
    }

    return (

        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-2" left={leftToolbarTemplate} ></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={50} rowsPerPageOptions={[50, 100, 125]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Paises"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column> */}
                    <Column field="Country" header="Pais" sortable style={{ minWidth: '12rem'  }}></Column>
                    <Column field="TotalConfirmed" header="Confirmados" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="TotalDeaths" header="Muertes" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="TotalRecovered" header="Recuperados" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="action" header="Info Pais" body={actionBodyTemplate} sortable style={{ minWidth: '10rem' }}></Column>
                </DataTable>


                <Dialog visible={productDialog} style={{ width: '900px' }} header={"Informacion - " + paisNombre } modal className="p-fluid"  onHide={hideDialog}>
                    <DataTable ref={dt} value={paisesInfo} selection={selectedProducts1} onSelectionChange={(e) => setSelectedProducts1(e.value)}
                        dataKey="id" paginator rows={50} rowsPerPageOptions={[50, 100, 125]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Paises"
                        globalFilter={globalFilter1} header={header1} responsiveLayout="scroll">
                        {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column> */}
                        <Column field="Date" header="Fecha" sortable style={{ minWidth: '12rem'  }}></Column>
                        <Column field="Active" header="Activos" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="Confirmed" header="Confirmados" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="Deaths" header="Muertes" sortable style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                </Dialog>

            </div>

        </div>
    );
}
export default App;
