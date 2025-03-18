'use client'

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import React, { useState } from "react";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});






export default function RootLayout({ children }) {
  const [client] = useState(new QueryClient());

  return (
    
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      ><MantineProvider>
        <QueryClientProvider client={client}>
        <Header/>
          <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      </QueryClientProvider>
      </MantineProvider>
      </body>
    </html>
  );
}


