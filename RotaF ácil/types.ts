import React from 'react';

export interface SubMenuItem {
  name: string;
}

export interface MenuItem {
  name: string;
  icon: React.FC<{ className?: string }>;
  subItems?: SubMenuItem[];
}
