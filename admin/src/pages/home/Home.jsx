import './home.scss'
import Sidebar from '../../components/sidebar/Sidebar'

const Home = () => {
    return (

        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <div className="widgets">
                    Widgets
                </div>
                <div className="charts">

                </div>
                <div className="listContainer">
                    <div className="listTitle">Latest Transactions</div>

                </div>
            </div>
        </div>
    )
}

export default Home