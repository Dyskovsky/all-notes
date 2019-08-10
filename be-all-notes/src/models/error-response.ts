import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiModelProperty()
  readonly statusCode: number;

  @ApiModelProperty()
  readonly message: string;

  @ApiModelPropertyOptional()
  readonly error?: string;
}
