import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import numberWithCommas from '../../utils/numberWithCommas'

const IMG_URL = "http://localhost:8080/files/";
const ListOrderDetail = () => {

    const [category, setCategory] = useState([])
    const { maorder } = useParams();
    const categoryApi = `http://localhost:8080/api/orderdetail/orderdetail/${maorder}`
    useEffect(() => {
        fetch(categoryApi)
            .then(res => res.json())
            .then(categories => {
                setCategory(categories)
            })
    }, [])
    console.log(category)
    return (
        <>
            <h2 className="text-center">Chi Tiết Đơn Hàng</h2>
            <div className="row">
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr><th> STT </th>
                            <th> Tên sản phẩm </th>
                            <th> Hình </th>
                            <th> Số lượng </th>
                            <th> Đơn giá </th>
                            <th> Thành tiền </th>
                        </tr>
                    </thead>
                    {
                        category.map((item, index) => (
                            <tbody>

                                <tr ><td> {index + 1}</td>
                                    <td> {item.ten}</td>
                                    <td> < img
                                        src={IMG_URL + item.image}
                                        alt=""
                                        width=" 70"
                                        height="100"
                                    />{" "}</td>
                                    <td> {item.soluong}</td>
                                    <td> {numberWithCommas(item.dongia) + " đ"}</td>
                                    <td> {numberWithCommas(item.thanhtien) + " đ"}</td>


                                </tr>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </>
    );
}


export default ListOrderDetail;