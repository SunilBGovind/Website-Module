# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in kaynes_website/__init__.py
from kaynes_website import __version__ as version

setup(
	name='kaynes_website',
	version=version,
	description='Website For Kaynes Technology',
	author='Sunil Govind',
	author_email='sunil.govind@kaynestechnology.net',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
