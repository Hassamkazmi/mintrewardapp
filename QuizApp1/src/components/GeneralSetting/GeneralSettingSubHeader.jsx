import React from 'react'
import { Fragment } from 'react'
import GeneralSettingFormOne from './GeneralSettingFormOne'
import GeneralSettingFormTwo from './GeneralSettingFormTwo'

export function GeneralSettingSubHeader() {
    return (
        <Fragment>
            <div className="row customers generalSettingSubHeader">
                <div className='col-sm-6 generalSububHeader'>
                    <h2>Settings</h2>
                </div>
                <div className='col-sm-6 generalSububHeaderBtn'>
                    <button className='yellowbtn'>
                        {' '}SAVE{' '}
                    </button>
                </div>
                <div className='row grayshade'>
                    <div className='col-sm-6 fulwid'>
                        <GeneralSettingFormOne />
                    </div>
                    <div className='col-sm-6 fulwid'>
                        <GeneralSettingFormTwo />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}