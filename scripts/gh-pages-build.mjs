import fs from 'fs'
import path from 'path'

const apiDir = path.join(process.cwd(), 'app', 'api')
const backupDir = path.join(process.cwd(), '.api-backup')

export function hideApiRoutes() {
  if (fs.existsSync(apiDir)) {
    fs.renameSync(apiDir, backupDir)
    console.log('Moved app/api aside for static export')
  }
}

export function restoreApiRoutes() {
  if (fs.existsSync(backupDir)) {
    fs.renameSync(backupDir, apiDir)
    console.log('Restored app/api after static export')
  }
}

if (process.argv[2] === 'hide') {
  hideApiRoutes()
} else if (process.argv[2] === 'restore') {
  restoreApiRoutes()
}
