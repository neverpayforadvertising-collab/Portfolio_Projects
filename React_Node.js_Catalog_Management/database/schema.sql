CREATE DATABASE CatalogOps;
GO

USE CatalogOps;
GO

CREATE TABLE products (
  id INT IDENTITY(1,1) PRIMARY KEY,
  sku NVARCHAR(128) NOT NULL UNIQUE,
  name NVARCHAR(256) NOT NULL,
  description NVARCHAR(MAX) NULL,
  category NVARCHAR(128) NOT NULL,
  price DECIMAL(18,4) NOT NULL,
  regions NVARCHAR(512) NOT NULL,
  stock INT NOT NULL,
  status NVARCHAR(16) NOT NULL,
  updatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE pricing_rules (
  id INT IDENTITY(1,1) PRIMARY KEY,
  sku NVARCHAR(128) NOT NULL,
  region NVARCHAR(64) NOT NULL,
  adjustmentType NVARCHAR(16) NOT NULL,
  adjustmentValue DECIMAL(18,4) NOT NULL,
  reason NVARCHAR(512) NOT NULL,
  createdAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE TABLE inventory (
  id INT IDENTITY(1,1) PRIMARY KEY,
  sku NVARCHAR(128) NOT NULL,
  region NVARCHAR(64) NOT NULL,
  quantity INT NOT NULL,
  lastUpdated DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);

CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_pricing_rules_sku ON pricing_rules(sku);
CREATE INDEX idx_inventory_sku_region ON inventory(sku, region);
