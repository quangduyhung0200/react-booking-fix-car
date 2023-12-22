import React, { Component } from 'react';


import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import './RegisterGara.scss';

import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getAllProvind } from '../../services/userService';
import { UserContext } from "../../context/userContext"
import CommonUtils from '../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { registerGara } from '../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class RegisterGara extends Component {
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
            phone: ''
        }
    }
    buidDataInputSeclectRequier = (inputData) => {
        let resuf = []

        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {

                let obj = {};


                obj.label = item.name;
                obj.value = item.id;
                resuf.push(obj);

            })


        }

        return resuf
    }
    async componentDidMount() {
        let data = await getAllProvind()

        let coppystate = { ...this.state }
        let dataprovind = this.buidDataInputSeclectRequier(data.DT)
        coppystate.listProvint = dataprovind
        coppystate.emailUser = this.context.user.account.email
        this.setState({
            ...coppystate
        })


    }
    handlChaneSelectProvind = async (selectedOption, name) => {

        let stateName = name.name
        let stateCoppy = { ...this.state }
        stateCoppy[stateName] = selectedOption

        this.setState({
            ...stateCoppy
        })

    }
    handlOnChandText = (event, id) => {
        let stateCoppy = { ...this.state }
        stateCoppy[id] = event.target.value
        this.setState({
            ...stateCoppy
        })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contenMarkdown: text,
            contenHTML: html
        })
    }
    handleSveConTen = async () => {

        let { nameGara, contenMarkdown, contenHTML, addressGara, avata, phone, description, emailUser } = this.state
        let provindId = this.state.selectProvint.value

        if (!this.state.contenHTML || !this.state.contenMarkdown || !this.state.description


            || !this.state.selectProvint
        ) {
            alert('missign requi')
        }

        else {
            let data = await registerGara(nameGara, contenMarkdown, contenHTML, addressGara, provindId, avata, phone, description, emailUser)
            console.log(data)
        }


    }
    handleOnchandImage = async (event) => {
        let data = event.target.files;
        let file = data[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            let ObjectURL = URL.createObjectURL(file);
            this.setState({
                previewimg: ObjectURL,
                avata: base64
            })
        }

    }
    handlOnClickPreviewImg = () => {
        if (!this.state.previewimg) return;
        this.setState({
            isOpen: true
        })
    }


    render() {

        console.log(this.state)
        return (
            <>
                {this.state.isOpen === true && <><Lightbox
                    mainSrc={this.state.previewimg}
                    onCloseRequest={() => this.setState({ isOpen: false })} />
                    <div>Asdadsasd</div></>

                }
                <div className='register-container container'>
                    <div className='register-title'>hello from register gara</div>
                    <div className='register-body row'>
                        <div className='conten-left col-6'>
                            <label>thong tin gioi thieu</label>
                            <textarea className='form-control' rows={4}
                                onChange={(event) => this.handlOnChandText(event, 'description')}
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
                                    <div onClick={() => this.handlOnClickPreviewImg()} className='preView-Image' style={{ backgroundImage: `url(${this.state.previewimg})` }}></div>
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
RegisterGara.contextType = UserContext

export default RegisterGara;
