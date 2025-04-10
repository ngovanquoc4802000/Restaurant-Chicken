import React from "react";
import styles from "../styles/admin.module.css";

interface ContentAreaProps {
  children: React.ReactNode;
  title: string;
}

const ContentArea = ({ children, title }: ContentAreaProps) => {
  return (
    <div className={styles.contentArea}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {children}
    </div>
  );
};

export default ContentArea;
