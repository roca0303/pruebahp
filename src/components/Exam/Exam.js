    
import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import '../../index.css';


function App() {
    return (
        <div>
            <DataTableCrudForm />
        </div>
    );
}

const DataTableCrudForm = () => {

    let emptyProduct = {
        id: null,
        image: null,
        name: '',
        apellido: '',
        fechaNacimiento: '',
        temperatura: '',
        fiebre: -1,
        vomito: -1,
        cabeza: -1,
        estomago: -1,
    };

    const [products, setProducts] = useState([]);
    const [productDialog, setProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [date7] = useState(null);

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);
        if( product.nombre == "" || product.apellido == "" || product.temperatura == "" || product.fechaNacimiento == "" ){
            //validaciones de los campos del form
        }        
        else
        {
            if (product.name.trim()) {
                let _products = [...products];
                let _product = {...product};
                if (product.id) {
                    const index = findIndexById(product.id);

                    _products[index] = _product;
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                }
                else {
                    _product.id = createId();
                    _product.image = 'product-placeholder.svg';
                    _products.push(_product);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }

                setProducts(_products);
                setProductDialog(false);
                setProduct(emptyProduct);
            }
        }
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    // componente para manejar los cambios de estado de los input del formulario, se van guardando dentro de la variable _product la cual se usa despues para procesar la información.
    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;
        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;
        setProduct(_product);
    }

    const onInputChangeDateTime = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val.toISOString().slice(0,10);
        setProduct(_product);
    }

    // componente barra de herramientas izwuierda para mostrar el agregar nuevo paciente
    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Agregar" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const sintomasBodyTemplate = (rowData) => {
        let sintomas = ["cabeza", "estomago", "fiebre", "vomito"];
        let sintomasAMostrar = "";
        let sintomaEncontrado;
        let a = Object.values(rowData);
        sintomas.forEach(element => {
            sintomaEncontrado = a.filter(sintoma => sintoma == element);
            if ( sintomaEncontrado.length === 0 ){
                // dejo la opcion por futuras modificaciones o validaciones
            }
            else{
                sintomasAMostrar += " " + sintomaEncontrado[0];
            }
        });
        return (
            <p> {sintomasAMostrar} </p>        
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    // componente para cancelar o grabar la informacion del formulario
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Guardar" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    const onSintomaChange = (e, sintoma) => {
        let _product = {...product};
        if (e.checked)
            _product[`${sintoma}`] = sintoma;
        else
            _product[`${sintoma}`] = -1;            
        setProduct(_product);
    }

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} ></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    {/* <Column field="id" header="id" sortable style={{ minWidth: '12rem' }}></Column> */}
                    <Column field="name" header="Nombre" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="apellido" header="Apellido"  sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="fechaNacimiento" header="Nacimiento"  sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="temperatura" header="Temperatura"  sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="" header="Sintomas" body={sintomasBodyTemplate}  sortable style={{ minWidth: '16rem' }}></Column>
                </DataTable>
            </div>


            {/* modal para el formulario */}
            <Dialog visible={productDialog} style={{ width: '450px' }} header="Ingresar Datos" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.image} className="product-image block m-auto pb-3" />}

                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Nombre es requerido.</small>}
                </div>

                <div className="field">
                    <label htmlFor="apellido">Apellido</label>
                    <InputText id="apellido" value={product.apellido} onChange={(e) => onInputChange(e, 'apellido')} required className={classNames({ 'p-invalid': submitted && !product.apellido })} />
                    {submitted && !product.apellido && <small className="p-error">Apellido es requerido.</small>}
                </div>

                <div className="field">
                    <div className="field col-6 md:col-6">
                        <label htmlFor="Fecha Nacimiento:">Fecha Nacimiento</label>
                        <Calendar dateFormat="mm-dd-yy" id="basic" value={date7} onChange={(e) => onInputChangeDateTime(e,'fechaNacimiento')}  />
                        {submitted && !product.fechaNacimiento && <small className="p-error">La Fecha es requerida.</small>}

                    </div> 
                </div>

                <div className="field">
                    <label htmlFor="temperatura">Temperatura</label>
                    <InputNumber id="temperatura" 
                        value={product.temperatura} 
                        min={0} max={100}  
                        onChange={(e) => onInputNumberChange(e, 'temperatura')} required  className={classNames({ 'p-invalid': submitted && !product.temperatura })}   />
                    {submitted && !product.temperatura && <small className="p-error">La Temperatura es requerida.</small>}
                </div>


                <div className="field">
                    <label className="mb-3">Sintomas</label>
                    <div className="formgrid grid">


                        <div className="field-checkbox col-4" >
                            <Checkbox inputId="sintoma1" name="sintoma" value={product.fiebre} onChange={(e) => onSintomaChange(e, 'fiebre')}  checked={product.fiebre !== -1} />
                            <label htmlFor="sintoma1">Fiebre</label>
                        </div>
                        <div className="field-checkbox col-4" >
                            <Checkbox inputId="sintoma2" name="sintoma" value={product.vomito} onChange={(e) => onSintomaChange(e, 'vomito')}  checked={product.vomito !== -1} />
                            <label htmlFor="sintoma1">Vomito</label>
                        </div>
                        <div className="field-checkbox col-4">
                            <Checkbox inputId="sintoma2" name="sintoma" value={product.cabeza} onChange={(e) => onSintomaChange(e, 'cabeza')}  checked={product.cabeza !== -1} />
                            <label htmlFor="sintoma1">Cabeza</label>
                        </div>
                        <div className="field-checkbox col-4">
                            <Checkbox inputId="sintoma2" name="sintoma" value={product.estomago} onChange={(e) => onSintomaChange(e, 'estomago')}  checked={product.estomago !== -1} />
                            <label htmlFor="sintoma2">Estomago</label>
                        </div>

                    </div>
                </div>

            </Dialog>
            {/* fin del modal para el formulario */}

        </div>
    );
}

export default App;
