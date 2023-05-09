import { useMemo, useState } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { dishesColumns } from '../../utils/datatableColumns'
import { Link } from 'react-router-dom'
import { useGetDishes, useGetSuppliers } from '../../services'

const ListDishes = () => {
    const DishesData = useGetDishes()
    const [data, setData] = useState(DishesData)

    useMemo(() => {
        setData(DishesData)
    }, [DishesData])

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id))
    }

    // console.log(useGetSuppliers())


    const actionColumn = [
        {
            field: 'action',
            headerName: 'Tác vụ',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            Delete
                        </div>
                    </div>
                )
            }
        }
    ]
    return (
        <div className="datatable">
            <div className="datatableTitle">
                Danh sách sản phẩm
            </div>
            <DataGrid
                className="datagrid"
                rows={data}
                columns={dishesColumns.concat(actionColumn)}
                pageSize={9}
                rowsPerPageOptions={[9]}
                checkboxSelection
            />
        </div>
    )
}

export default ListDishes