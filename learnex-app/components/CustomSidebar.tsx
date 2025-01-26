import React from "react";
import { SideBar, SideBarSection, SidebarItem } from "@/components/ui/sideBar";

const CustomSideBar = () => {
  return (
    <SideBar className="border-r bg-background">
      <SideBarSection title="Physics" link="/subjects/physics">
        <SidebarItem
          title="Chapter 1"
          items={[
            {
              name: "Section 1.1",
              link: "/subjects/physics/chapter/1/section/1.1",
            },
            {
              name: "Section 1.2",
              link: "/subjects/physics/chapter/1/section/1.2",
            },
          ]}
        />
        <SidebarItem
          title="Chapter 2"
          items={[
            {
              name: "Section 1.1",
              link: "/subjects/physics/chapter/2/section/1.1",
            },
            {
              name: "Section 1.2",
              link: "/subjects/physics/chapter/2/section/1.2",
            },
          ]}
        />
      </SideBarSection>

      <SideBarSection title="Mathematics" link="/subjects/mathematics">
        <SidebarItem
          title="Chapter 1"
          items={[
            {
              name: "Section 1.1",
              link: "/subjects/mathematics/chapter/1/section/1.1",
            },
            {
              name: "Section 1.2",
              link: "/subjects/mathematics/chapter/1/section/1.2",
            },
          ]}
        />
        <SidebarItem
          title="Chapter 2"
          items={[
            {
              name: "Section 1.1",
              link: "/subjects/mathematics/chapter/2/section/1.1",
            },
            {
              name: "Section 1.2",
              link: "/subjects/mathematics/chapter/2/section/1.2",
            },
          ]}
        />
      </SideBarSection>
      <SideBarSection title="English" link="/subjects/english">
        <SidebarItem
          title="Chapter 1"
          items={[
            {
              name: "Section 1.1",
              link: "/subjects/english/chapter/1/section/1.1",
            },
            {
              name: "Section 1.2",
              link: "/subjects/english/chapter/1/section/1.2",
            },
          ]}
        />
      </SideBarSection>
    </SideBar>
  );
};

export default CustomSideBar;
