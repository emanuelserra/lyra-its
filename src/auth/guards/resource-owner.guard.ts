import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '../../common/enums/user-role.enum';

@Injectable()
export class ResourceOwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const resourceId = +request.params.id;

    // Admin can access everything
    if (user.role === UserRole.ADMIN) {
      return true;
    }

    // Professor can access everything
    if (user.role === UserRole.PROFESSOR) {
      return true;
    }

    // Tutor can access everything (view only)
    if (user.role === UserRole.TUTOR) {
      return true;
    }

    // Student can only access their own resources
    if (user.role === UserRole.STUDENT) {
      if (user.student && user.student.id === resourceId) {
        return true;
      }
      throw new ForbiddenException('You can only access your own resources');
    }

    throw new ForbiddenException('Access denied');
  }
}
