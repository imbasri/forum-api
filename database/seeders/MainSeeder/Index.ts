import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class IndexSeeder extends BaseSeeder {
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    await new Seeder.default(this.client).run()
  }

  public async run() {
    await this.runSeeder(await import('../UserSeeder'))
    await this.runSeeder(await import('../CategorySeeder'))
    await this.runSeeder(await import('../ThreadSeeder'))
  }
}
