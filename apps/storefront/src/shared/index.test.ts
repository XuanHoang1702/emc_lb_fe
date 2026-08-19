import { describe, it, expect } from 'vitest';
import * as api from '@/shared/api';
import * as config from '@/shared/config';
import * as hooks from '@/shared/hooks';
import * as ui from '@/shared/ui';
import type { ApiResponse, PaginatedResponse, Pagination, ErrorResponse } from '@/shared/types';

describe('shared barrels', () => {
  it('exposes api client', () => {
    expect(api.apiClient).toBeDefined();
    expect(typeof api.createApiClient).toBe('function');
  });

  it('exposes env config', () => {
    expect(config.env).toBeDefined();
    expect(config.env.APP_TITLE).toBe('EMC E-Commerce');
  });

  it('exposes useDebounce hook', () => {
    expect(typeof hooks.useDebounce).toBe('function');
  });

  it('exposes Button', () => {
    expect(ui.Button).toBeDefined();
  });

  it('exposes contract types', () => {
    const _t: ApiResponse<string> | undefined = undefined;
    const _p: PaginatedResponse<string> | undefined = undefined;
    const _pg: Pagination | undefined = undefined;
    const _e: ErrorResponse | undefined = undefined;
    expect(_t ?? _p ?? _pg ?? _e).toBeUndefined();
  });
});
