import React from 'react'
import { list } from '../../util'

import './MenuIcon.css'

function MenuIcon({ toggle, onClick }) {
	return (
		<div className={list('menu-icon', toggle && 'toggled')} onClick={onClick}>
			<div className='menu-bar' />
			<div className='menu-bar' />
			<div className='menu-bar' />
		</div>
	)
}

export default React.memo(MenuIcon)