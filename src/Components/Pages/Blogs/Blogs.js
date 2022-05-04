import React, { useEffect, useState } from 'react';
import Spinner from '../../Shared/Spinner';

const Blogs = () => {
   document.title = "EC-House Blog";
   const [faq, setFaq] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      fetch('http://localhost:5000/blog')
         .then(res => res.json())
         .then(data => {
            setFaq(data);
            setLoading(false);
         });
   }, []);

   let ques = 0;

   return (
      <div className='blog__section py-5' style={{ minHeight: "90vh" }}>
         <h2 className="section_title">Frequently Asked <span>Question</span></h2>
         <div className="container mt-5">

            <div className="row">
               {
                  loading === false ? faq.map(items => {
                     const { question, answer, _id } = items;
                     return (
                        <div className="col-lg-8 mx-auto card_main mb-4" key={_id}>
                           <article>
                              <strong>Q-{++ques}. {question}</strong>
                              <p className='ps-3 mt-3'>{answer}</p>
                           </article>
                        </div>
                     )
                  }) : <Spinner></Spinner>
               }
            </div>
         </div>
      </div>
   );
};

export default Blogs;