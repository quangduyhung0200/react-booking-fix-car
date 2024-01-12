import React, { Component } from 'react';

import { UserContext } from '../../../context/userContext';
import './comment.scss'
import { getAllCommentByGara } from '../../../services/guestService';
import { Rating } from 'react-simple-star-rating'
class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rateting: 4,
            ratetingGara: 0,
            listComment: [],
            garaId: ''

        }
    }
    async componentDidMount() {


    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.rate !== this.props.rate) {
            this.setState({
                ratetingGara: this.props.rate
            })
        }
        if (prevProps.currenGaraId !== this.props.currenGaraId) {
            let res = await getAllCommentByGara(this.props.currenGaraId)

            if (res.EC === 0) {
                this.setState({
                    garaId: this.props.currenGaraId,
                    listComment: res.DT
                })
            }

        }
    }



    render() {
        let { listComment } = this.state

        return (
            <>

                <div className='container comment-container'>
                    <div className='row'>
                        <div className='comment-rate-final col-12 my-4'>

                            <div className='fs-1'>Đánh giá:   {Math.round(this.state.ratetingGara * 10) / 10}/5</div>
                            <Rating
                                allowFraction={true}
                                initialValue={this.state.ratetingGara}
                                allowHover={false}
                                disableFillHover={true}
                                size={50}



                            /* Available Props */
                            />
                        </div>
                        <hr></hr>
                        <div className='comment-customer'>
                            {listComment && listComment.length > 0 &&
                                listComment.map((item, index) => {
                                    let str = item.createdAt;
                                    let endDate = Date.parse(str);
                                    let s = new Date(endDate).toLocaleDateString("vi")
                                    return (

                                        <>


                                            <div className='comment-header col-4 justify-content-between'>
                                                <h5>{item.UserComment.userName} </h5>
                                                <p class="day">Viết ngày {s}</p>
                                            </div>

                                            <div className='comment-rate col-12'>


                                                <Rating

                                                    initialValue={+item.rate}
                                                    allowHover={false}
                                                    disableFillHover={true}
                                                    size={20}




                                                />
                                            </div>
                                            <div className='comment-body mx-4'>
                                                {item.comment}
                                            </div>
                                            <hr></hr>

                                        </>

                                    )
                                })}
                        </div>


                    </div>

                </div>

            </>
        );
    }
}
Comment.contextType = UserContext


export default Comment;
