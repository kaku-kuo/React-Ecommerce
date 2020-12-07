import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const Paginate = ({ page, pages, brand, keyword = "", isAdmin = false}) => {
    return pages > 1 &&(
           <Fragment>
            <ul className="pagination pagination-sm justify-content-center">
             {[...Array(pages).keys()].map(x => (
              <li className={x + 1 === page ? "page-item active":"page-item" } key={x + 1}>
               <Link className={x + 1 === page ? "page-link bg-warning border-warning":"page-link text-dark"} 
               to={!isAdmin ? keyword ? `/productlist/${brand}/${keyword}/page/${x + 1}`
                :
                `/productlist/${brand}/page/${x + 1}`: `/admin/page/${x + 1}`}>{x + 1}
              </Link>
              </li>
             ))}   
            </ul>
          </Fragment>
    )
}

export default Paginate;