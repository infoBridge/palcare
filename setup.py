from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in palcare/__init__.py
from palcare import __version__ as version

setup(
	name="palcare",
	version=version,
	description="Palcare",
	author="Tridz",
	author_email="info@tridz.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
