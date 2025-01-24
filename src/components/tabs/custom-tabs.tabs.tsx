import React from "react";

interface Tab {
    id: string | number;
    title: string;
}

interface CustomTabProps {
    tabs: Tab[];
    selectedTab: number;
    setSelectedTab: (index: number) => void;
}

const CustomTab: React.FC<CustomTabProps> = ({ tabs, selectedTab, setSelectedTab }) => {
    return (
        <>
            <div className="tab-container">
                {tabs &&
                    Array.isArray(tabs) &&
                    tabs.length > 1 &&
                    tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            onClick={() => setSelectedTab(index + 1)}
                            className={`tab ${selectedTab === index + 1 ? "active" : ""}`}
                        >
                            {tab.title}
                        </button>
                    ))}
            </div>
        </>
    );
};

export default CustomTab;
