import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { deleteProductHandler } from '../../Shared/ManageProduct/ManageProduct';
import ProductTable from '../../Shared/ProductTable/ProductTable';
import './ManageInventory.css';

const ManageInventory = () => {
   document.title = 'Manage Inventory';
   const [product, setProduct] = useState([]);
   const [msg, setMsg] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
      fetch('http://localhost:5000/inventory')
         .then(res => res.json())
         .then(data => setProduct(data));
   }, [product]);

   const deleteProductHandle = async (id) => {
      const mm = await deleteProductHandler(id);
      setMsg(mm);
   }

   const viewProductHandle = (id) => {
      navigate('/inventory/' + id);
   }

   useEffect(() => {
      setTimeout(() => {
         setMsg('');
      }, 5000);
   }, [msg]);

   return (
      <div className='manage_inventory__section' style={{ minHeight: "90vh" }}>
         <h2 className="section_title">Manage <span>Inventory</span></h2>
         {msg}
         <div className="container py-5">
            <div className="manage_inventory_header">
               <NavLink className='bt9 bt9_add' to={'/add-item'}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Add Item</NavLink>
            </div>
            <ProductTable
               viewProductHandle={viewProductHandle}
               deleteProductHandle={deleteProductHandle}
               product={product}>
            </ProductTable>
         </div>
      </div>
   );
};

export default ManageInventory;