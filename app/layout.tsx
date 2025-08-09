import './globals.css';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// 根layout只提供基础CSS
export default function RootLayout({ children }: Props) {
  return children;
}