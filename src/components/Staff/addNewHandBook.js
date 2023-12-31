import React, { Component } from 'react';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';


import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

import { UserContext } from "../../context/userContext"
import CommonUtils from '../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class AddNewHandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            contenMarkdown: '',
            contenHTML: '',
            description: '',
            nameGara: '',
            addressGara: '',
            listProvint: [],
            selectProvint: '',
            emailUser: '',
            avata: '',
            previewimg: '',
            isOpen: false,
            phone: '',
            id: ''
        }
    }

    async componentDidMount() {



    }



    render() {


        return (
            <>

                <div className='register-container container'>
                    <div className='register-title'>hello from register gara</div>
                    <div className='register-body row'>
                        <div className='conten-left col-6'>
                            <label>thong tin gioi thieu</label>
                            <textarea className='form-control' rows={4}

                                value={this.state.descpistion}>

                            </textarea>

                        </div>
                        <div className='conten-right col-6'>
                            <div className='col-12 form-group'>
                                <label>chon tinh thanh</label>
                                <Select
                                    value={this.state.selectProvint}
                                    onChange={this.handlChaneSelectProvind}
                                    options={this.state.listProvint}
                                    name="selectProvint"
                                />
                                <div className='col-12 form-group'>
                                    <label>so dien thoai</label>
                                    <input
                                        onChange={(event) => this.handlOnChandText(event, 'phone')} value={this.state.phone} className='form-control'
                                    ></input>
                                </div>
                            </div>

                            <div className='col-12 form-group'>
                                <label>dia chi gara</label>
                                <input
                                    onChange={(event) => this.handlOnChandText(event, 'addressGara')} value={this.state.addressGara} className='form-control'
                                ></input>
                            </div>
                            <div className='col-12 form-group'>
                                <label>ten gara</label>
                                <input
                                    onChange={(event) => this.handlOnChandText(event, 'nameGara')} value={this.state.nameGara} className='form-control'></input>
                            </div>

                            <div className='col-12 form-group'>
                                <label >
                                    image
                                </label>
                                <div className='preView-image-container '>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnchandImage(event)}></input>
                                    <label className='lable-upload' htmlFor='previewImg'>Tải ảnh </label>
                                    <div onClick={() => this.handlOnClickPreviewImg()} className='preView-Image'
                                        style={{ backgroundImage: `url(${this.state.previewimg})` }}></div>
                                </div>


                            </div>



                        </div>

                    </div>


                    <div className='manage-docter-editor'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contenMarkdown}></MdEditor>
                    </div>
                    <button className='btn-save-conten' onClick={() => this.handleSveConTen()}>
                        dang ky</button>

                </div>


            </>

        )
    }
}
AddNewHandBook.contextType = UserContext

export default AddNewHandBook;
