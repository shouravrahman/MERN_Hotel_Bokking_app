import React, { useState } from 'react'
import { Modal, Button, Carousel } from 'react-bootstrap'
const Room = ({ room }) => {
	const [show, setShow] = useState(false)

	const handleClose = () => setShow(false)
	const handleShow = () => setShow(true)
	return (
		<div className='row bs my-3'>
			<div className='col-md-4 me-5'>
				<img src={room.imageurls[0]} alt={room.name} className='smallimg' />
			</div>
			<div className='col-md-7'>
				<h1 className='mb-3'>{room.name}</h1>

				<p>
					<b>Max Count :</b> {room.maxcount}
				</p>
				<p>
					<b>Phone Number :</b> {room.phonenumber}
				</p>
				<p>
					<b>Type :</b> {room.type}
				</p>

				<div style={{ float: 'right' }}>
					<button onClick={handleShow} className='btn'>
						View Details
					</button>
				</div>
			</div>

			<Modal show={show} onHide={handleClose} size='lg'>
				<Modal.Header>
					<Modal.Title>{room.name}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Carousel variant='dark' prevLabel='' nextLabel='' fade>
						{room.imageurls.map((url) => {
							return (
								<Carousel.Item>
									<img className='bigimg d-block w-100' src={url} alt={room.name} />

									{/* <Carousel.Caption style={{ color: 'black' }}>
										{room.description}
									</Carousel.Caption> */}
								</Carousel.Item>
							)
						})}
					</Carousel>
					<p className='modal-desc'>{room.description}</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	)
}

export default Room
