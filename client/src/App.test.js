import { render, screen } from '@testing-library/react';
import App from './App';
import { IPFS } from "./ipfs_helper";
import { CONSTANTS } from "./constants";
// import test from 'node:test';
const test = require('node:test');


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


// test('ipfs get and post', () => {
//   let ipfs = new Deploy.IPFS(ID.CONSTANTS.ProjectID);
//   //ipfs.addToIpfs("/home/kennedy/Pictures/Wallpapers/Rust_programming_language_black_logo.svg.png");
//   // ipfs.getPinned("QmbAnco6cYmo6vz9HQwgWZ2B83pgHRMGjfPB27JNufYuEe");
//   ipfs.getPinnedList();
//   // ipfs.getGetway("Qmcvz5HL6ZSK9NLk4PLxj46nRzfyWWTF5Xy1JbCMKG6t3G");
//   console.log(Deploy.IPFS);
// });