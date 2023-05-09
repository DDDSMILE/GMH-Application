import ListSuppliers from '../../components/List/ListSuppliers'
import Sidebar from '../../components/sidebar/Sidebar'
import './dishes.scss'

const Suppliers = () => {
    return (
        <div className='list'>
            <Sidebar />
            <div className='listContainer'>
                <ListSuppliers />
            </div>
        </div>

    )
}

export default Suppliers