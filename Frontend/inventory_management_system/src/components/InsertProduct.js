import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    }

    const setPrice = (e) => {
        setProductPrice(e.target.value);
    }

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const addProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Por favor ingrese todos los campos requeridos.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/insertproduct`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": productPrice, "ProductBarcode": productBarcode })
            });

            await res.json();

            if (res.status === 201) {
                alert("Data Inserted");
                setProductName("");
                setProductPrice(0);
                setProductBarcode(0);
                navigate('/products');
            }
            else if (res.status === 422) {
                alert("El producto ya está añadido con el código de barra.");
            }
            else {
                setError("Algo fue mal. Por favor intente de nuevo.");
            }
        } catch (err) {
            setError("Un error ha ocurrido, por favor intente más tarde.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container-fluid p-5'>
             <h1 className=''>Ingresar información del producto</h1>
             
            <div className="mt-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="product_name" className="form-label fw-bold">Nombre del producto</label>
                <input type="text" onChange={setName} value={productName} className="form-control fs-5" id="product_name" placeholder="Ingresa el nombre del producto" required />
            </div>
            <div className="mt-3 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="product_price" className="form-label fw-bold">Precio del producto</label>
                <input type="number" onChange={setPrice} value={productPrice} className="form-control fs-5" id="product_price" placeholder="Ingresa el precio del producto" required />
            </div>
            <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12 fs-4">
                <label htmlFor="product_barcode" className="form-label fw-bold">Código de barras del producto</label>
                <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control fs-5" id="product_barcode" placeholder="Ingresa el código de barras" required />
            </div>
            <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                <NavLink to="/products" className='btn btn-primary me-5 fs-4'>Cancelar</NavLink>
                <button type="submit" onClick={addProduct} className="btn btn-primary fs-4" disabled={loading}>{loading ? 'Insertando...' : 'Insertar'}</button>
            </div>
            <div className="col text-center col-lg-6">
                {error && <div className="text-danger mt-3 fs-5 fw-bold">{error}</div>}
            </div>
        </div>
    )
}
