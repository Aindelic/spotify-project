import React, { useState, useRef } from 'react';
import { Form, Input, Button, Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

export default function App() {
    const [tracks, setTracks] = useState([]);
    const carouselRef = useRef();

    const handleSearch = async (values) => {
        const { searchTerm, limit } = values;
        const baseURL = 'https://www.apitutor.org/spotify/simple/v1/search';
        const url = `${baseURL}?q=${searchTerm}&type=track&limit=${limit}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            if(data.length) {
                setTracks(data);
            } else {
                setTracks([]);
                alert("No tracks found.");
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
            alert("Failed to fetch data. Please try again later.");
            setTracks([]); 
        }
    };

    return (
        <>
            <header>
                <h1>Spotify Demo</h1>
            </header>
            <main>
                <Form onFinish={handleSearch} layout="inline" initialValues={{ searchTerm: 'Adele', limit: 5 }}>
                    <Form.Item
                        name="searchTerm"
                        rules={[{ required: true, message: 'Please input your search term!' }]}
                    >
                        <Input placeholder="Search Term" />
                    </Form.Item>
                    <Form.Item
                        name="limit"
                        rules={[{ required: true, message: 'Please input the limit!' }]}
                    >
                        <Input placeholder="Limit" type="number" max="20" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">Search</Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center', margin: '20px' }}// I used ChatGpt For help with Button sizing syntax
                > 
                    <Button onClick={() => carouselRef.current.prev()} shape="circle" icon={<LeftOutlined />} />
                    <Button onClick={() => carouselRef.current.next()} shape="circle" icon={<RightOutlined />} style={{ marginLeft: '10px' }} />
                </div>
                <Carousel ref={carouselRef} autoplay dots={true} style={{ padding: '20px', overflow: 'hidden', maxWidth: '80%', margin: '0 auto', height: 'auto' }}>
                    {tracks.map(track => (
                        <div key={track.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}> 
                            <iframe
                                src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`} 
                                frameBorder="0"
                                allowFullScreen
                                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                loading="lazy"
                                title={track.name}
                                style={{ width: '60%', height: '100%' }} // ChatGpt helped me with formatting the page better here
                            ></iframe>
                        </div>
                    ))}
                </Carousel>
            </main>
        </>
    );
}
