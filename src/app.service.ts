import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './infra/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prismaServise: PrismaService) {}
  hello() {
    return 'Hello World!';
  }

  async getLinkByShortCode(code: string) {
    const link = await this.prismaServise.link.findUnique({
      where: {
        shortCode: code,
      },
    });

    if (!link) throw new NotFoundException('Link not found');

    return link;
  }

  async trackClick(code: string, ipAdress: string, userAgent: string) {
    const link = await this.getLinkByShortCode(code);

    await this.prismaServise.click.create({
      data: {
        ipAdress,
        userAgent,
        link: {
          connect: {
            id: link.id,
          },
        },
      },
    });
  }
}
