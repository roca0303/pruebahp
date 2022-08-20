import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import '../../index.css';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { PartidoService } from './paisesService';
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
            <DataTableCrudDemo />
        </div>
    );
}

const DataTableCrudDemo = () => {

    let emptyProduct = {
        teaml_id: null,
        teamv_id: null,
        fechaPartido: null,
    };

    const [products, setProducts] = useState(null);
    const [paisesInfo, setPaisesInfo] = useState(null);
    const [paisNombre, setPaisNombre] = useState(null);

    // const [permisoPagina, setPermisoPagina] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    //const [productDialog1, setProductDialog1] = useState(false);
    // const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    // const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [infoGlobals, setInfoGlobals] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [selectedProducts1, setSelectedProducts1] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [globalFilter1, setGlobalFilter1] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const productService = new PartidoService();
    const { token } = useToken();

    useEffect(() => {
        productService.getPaisesList(token).then(data => {
            //console.log (data['Countries']);
            if (data == "Error"){
                //setPermisoPagina(null);
                setProducts(null);
            }
            else{
                //console.log("poraquie cai");
                //setPermisoPagina(true);
                //console.log(data);
                setProducts(data['Countries']);
                setInfoGlobals(data['Global']);
            }
        });
        //teamService.getTeamsList(token).then(data => setCountries(data));

    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const openNew = () => {
        //let _product = {...product};
        //setSelectedCountry1(null);
        //setSelectedCountry2(null);
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
        //console.log(_product);
    }

    const openInfoPais = (e) => {
        // se pasa el SLUG del pais para la petición a la api de la información del país.
        setProductDialog(true); 
        console.log(e.Slug);
        productService.getPaisResgistros(e.Slug).then(data => {
            if (data == "Error"){
                //setPermisoPagina(null);
                setPaisesInfo(null);
            }
            else{
                var infoPaises = data.slice(data.length-30);
                console.log(infoPaises);
                setPaisNombre(infoPaises[0]["Country"]);
                setPaisesInfo(infoPaises);
                //setInfoGlobals(data['Global']);
            }
        });
                
    }

    const hideDialog = () => {
        setProductDialog(false);
    }

    // const onInputChange = (e, name) => {
    //     const val = e.value.id;//(e.target && e.target.value) || '';
    //     let _product = {...product};
    //     _product[`${name}`] = val;
    //     setProduct(_product);
    // }

    // const onInputChangeDateTime = (e, name) => {
    //     const val = (e.target && e.target.value) || '';
    //     let _product = {...product};
    //     _product[`${name}`] = val;
    //     setProduct(_product);
    // }

    // const onInputChange1 = (e, name, rowData) => {
    //     const val = e.value;
    //     let _product = {...product};
    //     _product[`${name}`] = val;
    //     setProduct(_product);
    //     //console.log(_product);
    // }

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

    // const imageBodyTemplate = (rowData) => {
    //     let url = process.env.REACT_APP_URL_IMAGES+rowData.banderaEquipoLocal;
    //     return (
    //         <React.Fragment>
    //             <img src={url} 
    //                 onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
    //                 alt={rowData.bandera} className="product-image" />
    //             <span className={`product-badge status-${rowData.equipoLocal.toLowerCase()}`}>{rowData.equipoLocal}</span>
    //         </React.Fragment>
    //     );
    // }

    // const imageVisitanteBodyTemplate = (rowData) => {
    //     let url = process.env.REACT_APP_URL_IMAGES+rowData.banderaEquipoVisitante;
    //     return (
    //         <React.Fragment>
    //             <img src={url} 
    //                 onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} 
    //                 alt={rowData.banderaEquipoVisitante} className="product-image" />
    //             <span className={`product-badge status-${rowData.equipoVisitante.toLowerCase()}`}>{rowData.equipoVisitante}</span>
    //         </React.Fragment>
    //     );
    // }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Paises</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const header1 = (
        <React.Fragment>
        </React.Fragment>
    );
    
    const productDialogFooter = (
        <React.Fragment>
        </React.Fragment>
    );


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


                <Dialog visible={productDialog} style={{ width: '900px' }} header={"Informacion - " + paisNombre } modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
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
