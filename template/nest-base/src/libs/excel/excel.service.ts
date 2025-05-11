import { Injectable, StreamableFile } from '@nestjs/common';
import { Column, Workbook } from 'exceljs';
import { PassThrough } from 'stream';

@Injectable()
export class ExcelService {
  // 导出单个 sheet 的 excel 文件
  async export(columns: Partial<Column>[], data: Array<Record<string, any>>, filename: string, sheetName = 'Sheet1') {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = columns;
    worksheet.addRows(data);
    const stream = new PassThrough();
    await workbook.xlsx.write(stream);
    return new StreamableFile(stream, {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      disposition: 'attachment; filename=' + filename,
    });
  }
}
