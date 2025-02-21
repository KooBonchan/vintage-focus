import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { Home } from '../pages/Home';
import { ProductList } from '../pages/product/ProductList';
import { ProductDetail } from '../pages/product/ProductDetail';

// 각 페이지별 렌더링 테스트

describe("Page tests", () => {
  test("Home renders", () =>{
    render(<Home />);
  });
  test("ProductList renders", () =>{
    render(<ProductList />);
  });
  test("ProductDetail renders", () =>{
    render(<ProductDetail />);
  });
});