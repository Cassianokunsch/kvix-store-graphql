import 'reflect-metadata';

import { Entity } from 'typeorm';

import { CommonCollumns } from '../../../helpers/CommonCollumns';

@Entity()
export class Admin extends CommonCollumns {}
