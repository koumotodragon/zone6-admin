// import React from 'react';

// import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
// import { ImProfile } from 'react-icons/im';
// import { MdAdminPanelSettings } from 'react-icons/md';

const links = [
  {
    text: 'add video',
    path: '.',
    icon: <FaWpforms />,
  },
  {
    text: 'all videos',
    path: 'all-videos',
    icon: <MdQueryStats />,
  },
  {
    text: 'Tags',
    path: 'tags',
    icon: <FaWpforms />,
  },
  // {
  //   text: 'stats',
  //   path: 'stats',
  //   icon: <IoBarChartSharp />,
  // },
  // {
  //   text: 'profile',
  //   path: 'profile',
  //   icon: <ImProfile />,
  // },
  // {
  //   text: 'admin',
  //   path: 'admin',
  //   icon: <MdAdminPanelSettings />,
  // },
];

export default links;
