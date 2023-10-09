import React, {PureComponent} from 'react';
import blocData from '../static/data.json';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function About() {
  console.log(blocData['action']);

  const changeRate = [
    {
      name: 'Action',
      rate: blocData['action']['change_profile']['change_rate']
    },
    {
      name: 'Content',
      rate: blocData['content_syntactic']['change_profile']['change_rate']
    }
  ];

  const averageChange = [
    {
      name: 'Action',
      word: blocData['action']['change_profile']['average_change']['word'],
      pause: blocData['action']['change_profile']['average_change']['pause'],
      activity: blocData['action']['change_profile']['average_change']['activity']
    },
    {
      name: 'Content',
      word: blocData['content_syntactic']['change_profile']['average_change']['word'],
      pause: 0,
      activity: blocData['content_syntactic']['change_profile']['average_change']['activity']
    }
  ]

  return (
    <div style={{ display: "flex", width: "100%", height: "800px"}}>
      <div style={{ width: "100%", height: "100%" }}>
      <h1>Change Profile</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={100}
          height={100}
          data={changeRate}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rate" fill="#143aa2" />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div style={{ width: "100%", height: "100%" }}>
      <h1>Average Change</h1>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={100}
          height={100}
          data={averageChange}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="word" fill="#143aa2" />
          <Bar dataKey="pause" fill="#2159c0" />
          <Bar dataKey="activity" fill="#6ea9fc" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  )
}

export default About;
