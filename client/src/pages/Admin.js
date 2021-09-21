import { Tabs } from 'antd'
import React from 'react'
import { TabPane } from 'react-bootstrap'

const Admin = () => {
	return (
		<div className='bs m-3'>
			<h2 className='text-center' style={{ fontSize: '30px' }}>
				<b>Admin Panel</b>
			</h2>
			<Tabs defaultActiveKey='1'>
				<TabPane tab='Bookings' key='1'></TabPane>
				<TabPane tab='Rooms' key='2'></TabPane>
				<TabPane tab='Add Rooms' key='3'></TabPane>
				<TabPane tab='Users' key='4'></TabPane>
			</Tabs>
		</div>
	)
}

export default Admin
