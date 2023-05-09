
import ListDishes from '../../components/List/ListDishes'
import Sidebar from '../../components/sidebar/Sidebar'
import './dishes.scss'

const Dishes = () => {
    return (
        <div className='list'>
            <Sidebar />
            <div className='listContainer'>
                <ListDishes />
            </div>
        </div>

    )
}

export default Dishes